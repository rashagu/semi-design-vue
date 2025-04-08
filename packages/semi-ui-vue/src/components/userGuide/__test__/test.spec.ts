import { expect, test, describe, beforeAll, vi } from 'vitest';
import Comp from "./UserGuideDemo";
import { fireEvent, render, screen } from '@testing-library/vue';


beforeAll(() => {
});
test('upload sss', async () => {

  render(Comp)
  const bt1 = await screen.findByTestId("showDialogBt")
  await fireEvent.click(bt1)


  await screen.findByText("跳过")

})
