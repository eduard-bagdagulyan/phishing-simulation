import { plainToInstance } from 'class-transformer';
import {
  IsEmail,
  IsNumber,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';

class EnvironmentVariables {
  @IsString()
  PHISHING_SIMULATION_URL: string;

  @IsNumber()
  @Min(0)
  @Max(65535)
  PHISHING_SIMULATION_PORT: number;

  @IsString()
  MAIL_HOST: string;

  @IsEmail()
  MAIL_USER: string;

  @IsString()
  MAIL_PASS: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
