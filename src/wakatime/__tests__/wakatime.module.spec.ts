import { WakatimeModule } from '../wakatime.module';

describe(`${WakatimeModule.name}`, () => {
  let module: WakatimeModule;

  beforeEach(() => {
    module = new WakatimeModule();
  });

  it(`#${WakatimeModule.name} should be defined without errors when services loads `, async () => {
    expect(module).toBeDefined();
  });
});
