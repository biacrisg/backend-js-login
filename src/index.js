import express from 'express';
import cors from 'cors';
import routes from './routes';
import cookieParser from 'cookie-parser';



const app = express();

const baseDir = `${__dirname}/loginUser`;
app.use(cookieParser());
app.use(express.static(`loginUser`));


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(process.env.PORT || 3000);
console.clear();
console.log('🚀 Server is running');
