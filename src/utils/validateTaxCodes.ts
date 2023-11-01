export function ValidateTaxCodes(taxId: string) {
  const validIds = ["1708", "3770", "3746"];

  if (validIds.includes(taxId)) {
    return true;
  } else {
    return false;
  }
}
