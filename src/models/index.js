import { UserModel } from "./user.model.js";
import { ProfileModel } from "./profile.model.js";

UserModel.hasOne(ProfileModel, {
  foreignKey: "user_id",
  as: "profile",
  onDelete: "CASCADE",
});

ProfileModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "user",
});

export {
  UserModel,
  ProfileModel,
};