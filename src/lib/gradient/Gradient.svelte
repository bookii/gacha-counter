<script>
  import { shiftColor } from "./Color";

  export var id;
  export var colorCode;

  export var x1;
  export var x2;
  export var y1;
  export var y2;
</script>

<defs>
  <linearGradient {id} {x1} {x2} {y1} {y2}>
    <stop offset="0" stop-color={colorCode} />
    <stop offset="1" stop-color={shiftColor(colorCode)} />
  </linearGradient>
</defs>
