import { expect, test, describe } from 'vitest'
import {mount} from "@vue/test-utils";
import invokeFns from "./invokeFns";

test('TypoDemo test', async () => {
  invokeFns([
    ()=>{}
  ], [1,2,3])
})
