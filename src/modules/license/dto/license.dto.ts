interface LicenseDTOProps {
  id: string;
  name: string;
}

export class LicenseDTO {
  id: string;
  name: string;

  constructor(props: LicenseDTOProps) {
    this.id = props.id;
    this.name = props.name;
  }
}
