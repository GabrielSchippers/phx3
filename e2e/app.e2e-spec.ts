import { Phx3Page } from './app.po';

describe('phx3 App', () => {
  let page: Phx3Page;

  beforeEach(() => {
    page = new Phx3Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
