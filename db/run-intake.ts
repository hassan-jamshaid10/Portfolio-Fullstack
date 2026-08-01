import "./load-env";
import { runDailyLeadIntake } from "../src/server/leads/intake";
import { getDb } from "../src/server/db";

async function main() {
  const result = await runDailyLeadIntake();
  console.log(result);
  await getDb().destroy();
}

main().catch(async (error) => {
  console.error(error);
  try {
    await getDb().destroy();
  } catch {
    // ignore
  }
  process.exit(1);
});
