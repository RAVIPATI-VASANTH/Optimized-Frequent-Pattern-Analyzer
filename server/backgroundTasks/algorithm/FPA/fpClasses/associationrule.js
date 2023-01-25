class AssociationRule {
  constructor(lhs, rhs, confi) {
    this.LHS = lhs;
    this.RHS = rhs;
    this.confidence = confi;
  }
}

module.exports = AssociationRule;
