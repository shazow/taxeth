function TaxethError () {};
TaxethError.prototype = Object.create(Error.prototype);

export default {
  TaxethError,
};
