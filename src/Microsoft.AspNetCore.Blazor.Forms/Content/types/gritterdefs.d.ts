interface JQueryStatic {
  gritter: JQueryGritter;
}

interface JQueryGritterOptions {
  title: string,
  text: string,
  image?: string,
  sticky?: boolean,
  position?: string
}

interface JQueryGritter {
  add(options: JQueryGritterOptions): any;

  options: JQueryGritterOptions;
}
