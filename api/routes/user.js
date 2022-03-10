const express = require('express');
const router = express.Router();

const db = require("../connection/connection");

const jwt = require('jsonwebtoken');

router.get('/', (req,res) =>{
  db.query('select * from user', (err,rows, fields) =>{
    if(!err){
      res.json(rows);
    } else{
      console.log(err);
    }
  })
});

router.post('/singin', (req, res) => {
  const { email, senha } = req.body;
  db.query('select email,idlogin from user where email=? and senha=?', [email, senha], (err, rows, fields) => {
    if(!err){
      if(rows.length > 0){
        let data = JSON.stringify(rows[0]);
        const token = jwt.sign(data, 'stil');
        res.json({token});
      } else{
        res.json('Email ou senha incorretos');
      }
    } else{
      console.log(err);
    }
  }
  );
});

router.post('/signup', (req, res) => {
  console.log(req.body);
  const {userName, email, senha, fullname} = req.body;
  db.query(`INSERT INTO user(userName, email, senha, fullname) VALUES (?, ?, ?, ?)`, [userName, email, senha, fullname] ,(err, rows, fields) => {
    if(!err){
      res.json('Cadastro efetuado com sucesso');
    } else{
      throw err;
    }
  })
});

router.post('/exist', (req, res) => {
  const {userName, email, senha, fullname} = req.body;
  db.query('select * from user where email=? or userName=?', [email, userName], (err, rows, fields) => {
    if(!err){
      if(rows.length > 0){
        res.json(true);
      } else{
        res.json(false);
      }
    } else{
      console.log(err);
    }
  }
  );
});

router.post('/test', verifyToken,(req, res) => {
  res.json('Segredo');
});

function verifyToken(req, res, next){
  if(!req.headers.authorization) return res.status(401).json('Não autorizado');

  const token = req.headers.authorization.substr(7);
  if(token!==''){
    const content = jwt.verify(token,'stil');
    req.data = content;
    next();
  }else{
    res.status(401).json("Token vazio");
  }
}

router.post('/decoded', (req, res) =>{
  const { email, idlogin } = req.body;
  db.query('select * from user where email=?', [email], (err, rows, fields) => {
    if(!err){
      if(rows.length > 0){
        res.json(rows[0]);
      }
    } else{
      console.log(err);
    }
  }
  );
});

module.exports = router;
