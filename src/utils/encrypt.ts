import { PUBLIC_KEY } from "@/configs/const";
import JSEncrypt from "jsencrypt";
//@ts-ignore
import JSEncryptLong from "encryptlong";

export function encryption(data: any) {
  data = typeof data === "object" ? JSON.stringify(data) : data;
  var encrypt = new JSEncrypt();
  encrypt.setPublicKey(PUBLIC_KEY);
  return encrypt.encrypt(data);
}

export function encryptionLong(data: any) {
  data = typeof data === "object" ? JSON.stringify(data) : data;
  var encrypt = new JSEncryptLong();
  encrypt.setPublicKey(PUBLIC_KEY);
  return encrypt.encryptLong(data);
}
