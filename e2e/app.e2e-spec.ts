import { UiBddDashboardPage } from './app.po';

describe('ui-bdd-dashboard App', function() {
  let page: UiBddDashboardPage;

  beforeEach(() => {
    page = new UiBddDashboardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
