import { Language } from 'src/interfaces/programming-languages.interface';
import { WakatimeController } from '../wakatime.controller';
import { WakatimeService } from '../wakatime.service';
import { Editors } from 'src/interfaces/code-editors.interface';

describe(`${WakatimeController.name}`, () => {
  let controller: WakatimeController;

  const wakatimeServiceMock = {
    getLastSevenDaysMyStats: jest.fn(),
  };

  beforeEach(() => {
    controller = new WakatimeController(wakatimeServiceMock as any);
  });

  it(`should use the service #${WakatimeService.name} to get my last more seven days used programming languages`, async () => {
    const responseService = {
      languages: [
        {
          name: 'TypeScript',
          total_seconds: 66380.993269,
          percent: 51.16,
          digital: '18:26',
          decimal: '18.43',
          text: '18 hrs 26 mins',
          hours: 18,
          minutes: 26,
        },
      ] as Language[],
    };

    jest
      .spyOn(wakatimeServiceMock, 'getLastSevenDaysMyStats')
      .mockResolvedValue(responseService);

    const result = await controller.getLanguages();
    expect(wakatimeServiceMock.getLastSevenDaysMyStats).toHaveBeenCalled();
    expect(result).toEqual(responseService.languages);
  });

  it(`should use #${WakatimeService.name} to get my last more seven days used code editors`, async () => {
    const responseService = {
      editors: [
        {
          total_seconds: 129745.284512,
          name: 'VS Code',
          percent: 100,
          digital: '36:02',
          decimal: '36.03',
          text: '36 hrs 2 mins',
          hours: 36,
          minutes: 2,
        },
      ] as Editors[],
    };

    jest
      .spyOn(wakatimeServiceMock, 'getLastSevenDaysMyStats')
      .mockResolvedValue(responseService);

    const result = await controller.getEditors();
    expect(wakatimeServiceMock.getLastSevenDaysMyStats).toHaveBeenCalled();
    expect(result).toEqual(responseService.editors);
  });
});
