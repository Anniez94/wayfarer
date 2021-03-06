import pool from "../config/database";

pool.query(`DROP TABLE IF EXISTS users CASCADE;
        CREATE TABLE users(
          id serial PRIMARY KEY NOT NULL,
          first_name VARCHAR(50) NOT NULL,
          last_name VARCHAR(50) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(100) NOT NULL,
          is_admin BOOLEAN NOT NULL DEFAULT false
        );
        INSERT INTO users (
             first_name, last_name, email, password, is_admin
          ) VALUES
          ('Chiedu', 'Ken', 'anne94@gmail.com','12345678', true);

    DROP TABLE IF EXISTS buses CASCADE;
        CREATE TABLE buses(
          id serial PRIMARY KEY,
          number_plate VARCHAR NOT NULL,
          manufacturer VARCHAR NOT NULL,
          model VARCHAR NOT NULL,
          year VARCHAR NOT NULL,
          capacity INT NOT NULL
        );

    DROP TABLE IF EXISTS booking CASCADE;
        CREATE TABLE booking(
          id serial PRIMARY KEY,
          trip_id INT NOT NULL,
          user_id INT NOT NULL,
          booking_date DATE NOT NULL,
          created_on TIMESTAMP DEFAULT Now(), 
          FOREIGN KEY (trip_id) REFERENCES trip(id) ON DELETE CASCADE,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );

    DROP TABLE IF EXISTS trip CASCADE;
    DROP TYPE IF EXISTS status_code CASCADE;
    CREATE TYPE status_code AS ENUM ('active','cancelled');
        CREATE TABLE trip(
          id serial PRIMARY KEY,
          origin VARCHAR NOT NULL,
          destination VARCHAR NOT NULL,
          trip_date DATE NOT NULL,
          fare FLOAT NOT NULL,
          status VARCHAR NOT NULL DEFAULT 'active',
          bus_id INTEGER NOT NULL,
          FOREIGN KEY (bus_id) REFERENCES buses(id) ON DELETE CASCADE
        );
        `).then(() => {
    pool.end();
});

export default pool;

// require('make-runnable');