const latn2toba: Record<string, string> = {
  a: "ᯀ", ka: "ᯂ", ba: "ᯅ", pa: "ᯇ", na: "ᯉ", wa: "ᯋ", ga: "ᯎ",
  ja: "ᯐ", da: "ᯑ", ra: "ᯒ", ma: "ᯔ", ta: "ᯖ", sa: "ᯘ", ya: "ᯛ",
  la: "ᯞ", ca: "ᯡ", nya: "ᯠ", i: "ᯤ", u: "ᯥ", é: "ᯩ", o: "ᯬ",
  ng: "ᯰ", "#": "​", " ": "​",
};

export function convertToBatak(text: string): string {
  let result = "";
  let i = 0;

  while (i < text.length) {
    const three = text.slice(i, i + 3).toLowerCase();
    const two = text.slice(i, i + 2).toLowerCase();
    const one = text[i].toLowerCase();

    if (latn2toba[three]) {
      result += latn2toba[three];
      i += 3;
    } else if (latn2toba[two]) {
      result += latn2toba[two];
      i += 2;
    } else if (latn2toba[one]) {
      result += latn2toba[one];
      i += 1;
    } else {
      result += one;
      i += 1;
    }
  }

  return result;
}
