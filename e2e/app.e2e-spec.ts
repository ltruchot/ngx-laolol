import { NgxLaololPage } from './app.po';

describe('ngx-laolol App', () => {
  let page: NgxLaololPage;

  beforeEach(() => {
    page = new NgxLaololPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
