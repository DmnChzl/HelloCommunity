export class CreateProjectDto {
  title: string;
  subTitle?: string;
  description: string;
  endDate?: Date;
  startDate: Date;
}
