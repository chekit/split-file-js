'use strict';

const fs = require('fs');
const fetchData = require('./fetch-data');

// Переданный в таске id
const id = process.argv.slice(2)[0];

// Целевая директория
const rootDir = './_partials/';
// Директория с исходниками
const srcDir = './dist/';

/**
 * @return {Promise}
 */
const createRoot = function () {
  return new Promise(resolve => {
    fs.access(`${rootDir}`, err => {
      if (err) {
        fs.mkdir(`${rootDir}`, () => console.log(`==> CREATED ${rootDir}`));
        return resolve();
      }

      return resolve();
    });
  });
};

if ( !id ) {
  console.warn(`не указан ID`);
  process.exit(9);
} else {
  /**
   * Проверяем существует ли дирректория
   */
  createRoot()
    .then(() => {
      fs.mkdir(`${rootDir}landing${id}`, () => console.log(`==> CREATED ${rootDir}landing${id}`));

      fs.readFile(`${srcDir}landing-${id}.html`, 'utf-8', (err, data) => {
        if (err) throw err;

        /**
         * Fetching main content for landing
         * @type {String}
         */
        const contentData = fetchData(data, 'body')
          .replace(/%btnLink%/gi, '<?= $btnLink; ?>')
          .replace(/%btnText%/gi, '<?= $btnText; ?>');

        /**
         * Write fetched content to file
         */
        const contentParams = [
          `${rootDir}landing${id}/landing-${id}.content.php`,
          contentData,
          'utf-8',
          function (err) {
            if (err) throw err;

            console.log('==> Landing Content PHP Saved');
          }
        ];

        fs.writeFile(...contentParams);

        /**
         * Fetching content for footer
         * @type {String}
         */
        const footerData = fetchData(data, 'footer')
          .replace(/%footer%/gi, '<?= $footer; ?>');

        /**
         * Write fetched content to file
         */
        const footerParams = [
          `${rootDir}landing${id}/landing-${id}.footer.php`,
          footerData,
          'utf-8',
          function (err) {
            if (err) throw err;

            console.log('==> Landing Footer PHP Saved');
          }
        ];

        fs.writeFile(...footerParams);
      });

      fs.createReadStream(`${srcDir}css/landings/landing-${id}.min.css`)
        .pipe(fs.createWriteStream(`${rootDir}landing${id}/landing-${id}.min.css`))
    })
}