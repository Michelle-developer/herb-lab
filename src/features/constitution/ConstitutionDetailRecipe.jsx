function ConstitutionDetailRecipe({ constitution }) {
  return <div>{constitution.suggested_recipe.join('、')}</div>;
}

export default ConstitutionDetailRecipe;
