const nameApostropher = (name) => {
  if (name?.length > 0) {
    return name[name.length - 1].toLowerCase() === 's'
      ? `${name}'`
      : `${name}'s`;
  }
};

export default nameApostropher;
