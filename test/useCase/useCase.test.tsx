import { renderHook } from '@testing-library/react';

import { useCase } from '../../src';

describe(useCase, () => {
  it('should convert text to camel case', async () => {
    const { result } = renderHook(() => useCase());

    expect(result.current.toCamelCase('EquipmentClass name')).toEqual(
      'equipmentClassName'
    );
    expect(result.current.toCamelCase('hey dude what be up')).toEqual(
      'heyDudeWhatBeUp'
    );
    expect(
      result.current.toCamelCase('    johnny BonoRan    aMillon   ')
    ).toEqual('johnnyBonoRanaMillon');
  });
  it('should convert text to snake case', async () => {
    const { result } = renderHook(() => useCase());

    expect(result.current.toSnakeCase('snakyBois')).toEqual('snaky_bois');
    expect(
      result.current.toSnakeCase('Another Test To Check Snake Case')
    ).toEqual('another_test_to_check_snake_case');
    expect(
      result.current.toSnakeCase('oNe    WiTh LoTs    Of SpAcEs   ')
    ).toEqual('o_ne_wi_th_lo_ts_of_sp_ac_es');
  });
});
