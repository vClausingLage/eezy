export function validator(input: string) {
  return input.replace(/["'´`!;:.,§$€@%&\/()=~?*+\-#{}\[\]]/g, '')
}
