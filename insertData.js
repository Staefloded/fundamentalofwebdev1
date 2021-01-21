// we use pg library to
// request connection pool from postgres database
// psql -h traineedb.cgq0reqixqsd.us-east-1.rds.amazonaws.com -d postgres -U traineeUser password is traineePassword
const { Pool } = require('pg')

// we connect to pg using pool we requested
const pool = new Pool({
  user: 'traineeUser',
  host: 'traineedb.cgq0reqixqsd.us-east-1.rds.amazonaws.com',
  password: 'traineePassword',
  database: 'postgres',
  port: 5432,
  multipleStatements: true
})

// the pool emits an error on behalf of any idle clients
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

// if no error on idel client, pool connects to database
pool.connect((err, client, done) => {
    //if there is an error with our database connection strings
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    //if no error then we have successfully connected 
    console.log('Connected to database');
    // do not call done(); - because we want to use this connection 
    // to create/insert/delete or select records from our database
    // sometime we might also want to export this connection for other resources
});

// insert a record into our table
pool.query(
    `INSERT INTO TeamEleyowo2022 
                 (ID, COUNTRY, BUSINESS_NAME, FIRST_NAME, LAST_NAME, EMAIL_ADDRESS, DESCRIPTION, INDUSTRY, STAFF_SIZE, ACCOUNT_BALANCE, CREATED_DT)
                 VALUES 
                 ('1', 'Nigeria', 'Jon Stace Ventures', 'John', 'Stacey' , 'johnstacey@gmail.com', 'We are a company that deals with the buying and selling of cryptocurrencies', 'Financial', '10', '35000', '01-01-2021'),
                 ('2', 'Kenya', 'Ganduja Ventures', 'Sule', 'Dagboru' , 'ganduja@gmail.com', 'We sell the best and affordable cattles any where in Africa', 'Agriculture', '50', '50000000', '03-01-2020'),
                 ('3', 'Ghana', 'Your Phone Shop', 'Johnson', 'Odinaka' , 'johnsonodinaka@gmail.com', 'We sell the best and affordable phone any where in Ghana', 'Technology', '10', '4000000', '05-01-2020'),
                 ('4', 'Nigeria', 'Artee Steel', 'Fred', 'Samson' , 'artee@gmail.com', 'We sell the best steels across Nigeria', 'Manufacturing', '10', '500000000', '10-01-2020'),
                 ('5', 'Senegal', 'Elite Gaming', 'Chris', 'Gbekus' , 'elitegaming@gmail.com', 'We sell and deliver the gaming consoles at affordable prices', 'Gaming', '2', '100000', '11-01-2020')
                 `,
    (err, res) => {
      if(err) {
        console.log('Error or issue with table creation');
         console.log(err)
    } else {
        console.log('Inserted data into table successfully')
        console.log(res);
   }
  } 
);

pool.end();


// export connection
module.exports = pool;