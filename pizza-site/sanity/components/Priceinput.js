import React from 'react';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';

function createPatchFromValue(value) {
  return PatchEvent.from(value === '' ? unset() : set(Number(value))); // if value is empty deleteit
}

const formatMoney = Intl.NumberFormat('en-UK', {
  style: 'currency',
  currency: 'GBP',
}).format;

export default function PriceInput({ type, value, onChange, inputComponent }) {
  // When Sanity renders out this component in the Studio, it passes in props, ie. description etc. You can see these in devtools when in the Studio.

  return (
    <div>
      <h2>
        {type.title} - {value ? formatMoney(value / 100) : ''}
      </h2>
      <p>{type.description}</p>
      <input
        type={type.name}
        value={value}
        onChange={(event) => onChange(createPatchFromValue(event.target.value))}
        ref={inputComponent}
      />
    </div>
  );
}

PriceInput.focus = function () {
  this._inputElement.focus();
};

// onChange in price field in our component. pass the value Sanity (createPatchFromValue), Sanity patches it to itself using PatchEvent & does some magic.
