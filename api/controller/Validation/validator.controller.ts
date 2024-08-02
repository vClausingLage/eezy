export function validator (input: string): string {
  return input.replace(/["'´`!;:.,§$€@%&/()=~?*+\-#{}[\]]/g, '')
}
