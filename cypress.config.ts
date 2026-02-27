import { defineConfig } from "cypress";
import postgres from "postgres";
import customers from "./mockData/customers";
import revenue from "./mockData/revenue";
import bcrypt from 'bcrypt';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    experimentalRunAllSpecs: true,
    setupNodeEvents(on, config) {
      on('task', {
        async 'db:clear'() {
          const sql = postgres(config.env.POSTGRES_URL!, { ssl: 'require' });
          try {
            await sql`TRUNCATE TABLE revenue, users, customers, invoices RESTART IDENTITY CASCADE`;
            return { success: true };
          } catch (error) {
            console.error('Error clearing DB', error);
            throw error;
          } finally {
            await sql.end();
          }
        },

        async 'db:seed'() {
          const customersData = customers;
          const revenueData = revenue;
          const adminData = {
            name:     config.env.ADMIN_NAME,
            email:    config.env.ADMIN_EMAIL,
            password: config.env.ADMIN_PASSWORD,
          }
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(adminData.password, saltRounds);
          const sql = postgres(config.env.POSTGRES_URL!, { ssl: 'require' });
          try {
            const results = [];

            await sql`
                INSERT INTO users (name, email, password) 
                VALUES (${adminData.name}, ${adminData.email}, ${hashedPassword})
              `;

            for (const userData of customersData) {
              const [user] = await sql`
                INSERT INTO customers (name, email, image_url) 
                VALUES (${userData.name}, ${userData.email}, ${userData.image_url}) 
                RETURNING id
              `;

              if (userData.orders && userData.orders.length > 0) {
                const values = userData.orders.map((o: any) => ({
                  customer_id: user.id,
                  amount: o.amount,
                  status: o.status,
                  date: o.date
                }));
                await sql`INSERT INTO invoices ${sql(values)}`;
              }
        
              results.push(user);
            }

            for (const monthRevenue of revenueData) {
              const [user] = await sql`
                INSERT INTO revenue (month, revenue) 
                VALUES (${monthRevenue.month}, ${monthRevenue.revenue}) 
              `;
              results.push(user);
            }

            return { success: true };
          } catch (error) {
            console.error('Error seeding DB', error);
            throw error;
          } finally {
            await sql.end();
          }
        },
      });
    },
  },
});
