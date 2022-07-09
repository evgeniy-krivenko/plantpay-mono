import { ChangeEvent, ClipboardEvent, KeyboardEvent } from 'react';

interface IUsePhoneMask {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPaste: (e: ClipboardEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export const usePhoneMask = (): IUsePhoneMask => {
  const onPasteHandler = (e: ClipboardEvent<HTMLInputElement>): void => {
    const pasted = e.clipboardData;
    const digitPhone = e.currentTarget.value.replace(/\D/g, '');

    if (pasted) {
      const passedText = pasted.getData('Text');
      if (/\D/g.test(passedText)) {
        e.currentTarget.value = digitPhone;
      }
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const input = e.target;
    const selectionStart = input.selectionStart;
    if (input.value.length !== selectionStart) {
      const event = e.nativeEvent as InputEvent;
      if (event.data && /\D/.test(event.data)) {
        input.value = input.value.replace(/\D/g, '');
      }
      return;
    }
    input.value = clearPhone(input.value);
  };

  const clearPhone = (phone: string): string => {
    let digitPhone = phone.replace(/\D/g, '');

    if (!digitPhone) {
      return '';
    }

    if (['7', '8', '9'].indexOf(digitPhone[0]) === -1) {
      // not russian number
      return '+' + digitPhone.substring(0, 16);
    }

    let resultNumber;

    if (digitPhone[0] === '9') {
      digitPhone = '7' + digitPhone;
    }

    const firstSymbol = digitPhone[0] === '8' ? '8' : '+7';
    resultNumber = firstSymbol + ' ';

    if (digitPhone.length > 1) {
      resultNumber += '(' + digitPhone.substring(1, 4);
    }

    if (digitPhone.length >= 5) {
      resultNumber += ') ' + digitPhone.substring(4, 7);
    }

    if (digitPhone.length >= 8) {
      resultNumber += '-' + digitPhone.substring(7, 9);
    }

    if (digitPhone.length >= 10) {
      resultNumber += '-' + digitPhone.substring(9, 11);
    }
    return resultNumber;
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.code === 'Backspace' && e.currentTarget.value.replace(/\D/g, '').length === 1) {
      e.currentTarget.value = '';
    }
  };

  return {
    onChange: onChangeHandler,
    onPaste: onPasteHandler,
    onKeyDown: onKeyDownHandler,
  };
};
