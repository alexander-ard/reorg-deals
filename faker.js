import { faker } from '@faker-js/faker';
import fs from 'fs';
import process from 'node:process';

const generateRecord = (id) => ({
  id,
  issuer_name: faker.company.name(),
  deal_name: faker.commerce.productName(),
  bloomber_id: `BLOOM${faker.number.int({ min: 1000, max: 9999 })}`,
  total: parseFloat(faker.finance.amount(100000, 5000000, 2)),
  industry: faker.commerce.department(),
  status: ['Active', 'Completed', 'Pending'][
    Math.floor(Math.random() * ['Active', 'Completed', 'Pending'].length)
  ],
  analysts: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () =>
    faker.person.fullName()
  ),
  doc_count: faker.number.int({ min: 1, max: 20 }),
  custom_deal_identifiers: Array.from(
    { length: faker.number.int({ min: 1, max: 3 }) },
    () => `ID${faker.number.int({ min: 1000, max: 9999 })}`
  )
});

const generateData = (numRecords) =>
  Array.from({ length: numRecords }, (_, index) => generateRecord(index + 1));

const rows = process.argv[2];

const data = generateData(rows || 100);

fs.writeFileSync('./public/data.json', JSON.stringify(data, null, 2));
