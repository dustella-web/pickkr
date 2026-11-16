import {
  fetchExchangeRates,
  writeExchangeRateSnapshot,
} from '../src/lib/i18n/exchange-rates.ts';

async function main() {
  const snapshot = await fetchExchangeRates();
  await writeExchangeRateSnapshot(snapshot);
  console.log(
    `[exchange-rates] Updated at ${snapshot.updatedAt} (source: ${snapshot.source}):`,
    snapshot.rates
  );
}

main().catch((err) => {
  console.error('[exchange-rates] Failed to update exchange rates:', err);
  process.exit(1);
});
