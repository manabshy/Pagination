import { CcsPage } from './app.po';

describe('ccs App', function() {
  let page: CcsPage;

  beforeEach(() => {
    page = new CcsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
