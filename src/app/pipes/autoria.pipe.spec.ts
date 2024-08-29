import { FirstValuePipe } from './first-value.pipe';

describe('AutoriaPipe', () => {
  it('create an instance', () => {
    const pipe = new FirstValuePipe();
    expect(pipe).toBeTruthy();
  });
});
