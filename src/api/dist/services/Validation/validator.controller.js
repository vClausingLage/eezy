export function validator(input) {
    return input.replace(/["'´`!;:.,§$€@%&\/()=~?*+\-#{}\[\]]/g, '');
}
