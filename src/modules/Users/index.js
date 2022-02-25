import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { customAlphabet } from 'nanoid';


const prisma = new PrismaClient();
const secret = process.env.AUTH_SECRET;
const nanoid = customAlphabet('123456789ABCDFGHIJKLMQRSTUVWXYZ', 25);

module.exports = {

  async createUser(req, res) {
    const { name, email, cpf, user} = req.body;
    const { userData } = req;

    const exists = await prisma.tB_USERS.findFirst({
      where: { OR: [{ cpf }, { email }] },
    });

    if (exists) return res.status(400).json({ error: 'Usuário já cadastrado!' });

    const password = cpf.substring(5, 11);
    const hashedPassword = await bcrypt.hash(password, 10);
    const codeLogin = nanoid();

    const resp = await prisma.tB_USERS.create({
      data: {
        name,
        cpf,
        email,
        user,
        password: hashedPassword,
        code: codeLogin,
      },
    });

    const createWalletCode = await createWalletUser(resp.id);

    delete resp.password;

    return res.status(201).json(resp);
  },

  async login(req, res) {
    const { user, password } = req.body;

    const finduser = await prisma.tB_USERS.findFirst({ where: { user } });

    if (!finduser || finduser.deleted_at !== null) return res.status(404).send({ error: 'Usuário não encontrado!' });

    if (!(await bcrypt.compare(password, finduser.password))) return res.status(401).send({ error: 'Senha incorreta!' });

    delete finduser.password;
    const token = jwt.sign({ ...finduser }, secret);

    res.status(200).send({ success: true, token });
  }

};
