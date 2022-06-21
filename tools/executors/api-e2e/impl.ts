import { ExecutorContext, runExecutor } from '@nrwl/devkit';
import { promisify } from 'util';
import { exec } from 'child_process';

process.env['DATABASE_URL'] = 'postgresql://test:test@localhost:5433/test?schema=public'
process.env['JWT_ACCESS_TOKEN_SECRET'] = 'asdfiusd3823qhf39hqfd823nbajksdfuaoqh83'
process.env['JWT_ACCESS_TOKEN_EXPIRATION_TIME'] = '1h'
process.env['JWT_REFRESH_TOKEN_SECRET'] = 'asdfiusd3823qhf39hqfd823nbajksdfuaoqh94'
process.env['JWT_REFRESH_TOKEN_EXPIRATION_TIME'] = '14d'
process.env['JWT_REFRESH_TOKEN_EXPIRATION_DAY'] = '14';
process.env['SALT'] = '10';
process.env['BASE_URL'] = 'http://localhost:4200/';
process.env['SALT'] = '10';
process.env['JWT_VERIFICATION_TOKEN_SECRET'] = '7AnEd5epLmdaJfUrokkR';
process.env['JWT_VERIFICATION_TOKEN_EXPIRATION_TIME'] = '21600';
process.env['EMAIL_CONFIRMATION_URL'] = 'http://localhost:4200/confirm-email';
process.env['JWT_SECRET'] = 'akdjfsdkfsdf';


const DOCKER_UP = `./tools/executors/api-e2e/docker-run.sh`;
const DOCKER_DOWN = 'docker stop plantpay-test';


export interface EchoExecutorOptions {
  verbose: boolean;
}

export default async function echoExecutor(
  options: EchoExecutorOptions,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  console.info(`Run "api e2e tests"...`);
  console.info(`Run docker, migrations and seed...`);

  const { stderr } = await promisify(exec)(DOCKER_UP);
  if (stderr) {
    console.error(stderr)
    await promisify(exec)(DOCKER_DOWN);
    return { success: false }
  }

  const result = await runExecutor(
    { project: 'server', target: 'test-e2e' },
    {},
    context
  )

  for await (const res of result) {
    if (!res.success) {
      const { stdout, stderr } = await promisify(exec)(DOCKER_DOWN);
      console.log(stdout);
      console.log(stderr)
      return res;
    }
  }

  await promisify(exec)(DOCKER_DOWN);

  const success = true;
  return { success };
}
