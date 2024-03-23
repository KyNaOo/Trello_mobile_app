import React from 'react';
import renderer from 'react-test-renderer';
import ModalOneField from "../component/ModalOneField";
import expect from "expect";

test('renderModalCorrectly', () => {
    const btn = renderer.create(<ModalOneField text={'Test Modal'} type={'normal'} />).toJSON();
    expect(btn).toMatchSnapshot();
});
