import path from "path";
import fs from "fs/promises";

const testers = [
	"sanzhar.zhumabekov@nu.edu.kz",
	"aizhuldyz.nadirkhanova@nu.edu.kz",
	"rabina.abdrakhmanova@nu.edu.kz",
	"nurdana.sakenkyzy@nu.edu.kz",
	"temirlan.omarov@nu.edu.kz",
]

const banneds = [
	"olzhas.ussenov@nu.edu.kz",
	"temirlan.omarov@nu.edu.kz",
	"dilyara.zhalgasbayeva@nu.edu.kz",
	"olzhas.ussenov@nu.edu.kz",
	"malika.vassilova@nu.edu.kz",
	"zariat.shatkenova@nu.edu.kz",
	"nailya.muratkhan@nu.edu.kz",
	"akerke.yelyubayeva@nu.edu.kz",
	"zhibek.satenova@nu.edu.kz",
	"polina.len@nu.edu.kz",
	"dilnaz.yuldasheva@nu.edu.kz",
	"guldariya.zharkynbekova@nu.edu.kz",
	"nurdana.sakenkyzy@nu.edu.kz",
	"meruyert.mussamadinova@nu.edu.kz",
	"aliya.zhumagaliyeva@nu.edu.kz",
	"diana.tursynbayeva@nu.edu.kz",
	"aigerim.sakenova@nu.edu.kz",
	"perizat.abdirova@nu.edu.kz",
	"zhansaya.turaliyeva@nu.edu.kz",
	"tansulu.temirbekova@nu.edu.kz",
	"diana.molzhigit@nu.edu.kz",
	"aliya.balagazyyeva@nu.edu.kz",
	"mira.abdrakhmanova@nu.edu.kz",
	"alina.tolegen@nu.edu.kz",
	"madi.kushkentayev@nu.edu.kz"
]

export const generateSql = async () => {
	const bannedQueries = banneds.map((email) => `UPDATE "User" SET "roleCodename"='BANNED' WHERE "email"='${email}';`);
	const testerQueries = testers.map((email) => `UPDATE "User" SET "roleCodename"='TESTER' WHERE "email"='${email}';`);
	
	return [...bannedQueries, ...testerQueries].join('\n');
}