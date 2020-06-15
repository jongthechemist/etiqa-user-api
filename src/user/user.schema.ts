import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  uuid: string;
  
  @Prop()
  created: Date;
  
  @Prop()
  username: string;
  
  @Prop()
  email: string;
  
  @Prop()
  phone: string;
  
  @Prop()
  skillsets: string[];
  
  @Prop()
  hobby: string;
}

export const UserSchema = SchemaFactory.createForClass(User);