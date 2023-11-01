import {
  Container,
  Description,
  Amount,
  Local,
  Footer,
  Category,
  Date,
} from "./styles";

import { SupplierControlDTO } from "../../storage/suplliers/SupplierControlDTO";
type Props = {
  data: SupplierControlDTO;
};

export function TransactionExpenses({ data }: Props) {
  return (
    <Container>
      <Description>{data.fiscalNote}</Description>
      <Description>{data.taxId}</Description>
      <Amount>${data.taxValue}</Amount>
      <Local>{data.supplier}</Local>
      <Footer>
        <Category>{data.product}</Category>
        <Date>{data.fiscalNoteDate}</Date>
      </Footer>
    </Container>
  );
}
