import { db } from "./firebase";

export const doCreateUser = ( id, username, email, role ) => {
	db.ref(`users/${id}`).update({
		username,
		email,
		role,
	});
	db.ref(`pasiens/${id}/profil`).update({
		username,
		email,
		role,
	});
	db.ref(`pasiens/${id}`).update({
		flagActivity: "userIdle",
	});
};

export const doSimpanDiagnosaPasien = ( id, tanggalPeriksa, hasilDiagnosa ) => {
	db.ref(`pasiens/${id}/rekamMedik/${tanggalPeriksa}`).update({
		hasilDiagnosa,
	});
	db.ref(`pasiens/${id}`).update({
		flagActivity : "hasilDiagnosaDone",
	});
};

export const doSimpanObatPasien = ( id, tanggalPeriksa, hasilObat ) => {
	db.ref(`pasiens/${id}/rekamMedik/${tanggalPeriksa}`).update({
		hasilObat,
	});
	db.ref(`pasiens/${id}`).update({
		flagActivity : "hasilObatDone",
	});
};

export const doSimpanDaftarTunggu = ( uid ) => {
	const getter = db.ref(`pasiens/${uid}`).update({
		flagActivity : "antriPoliklinik",
	});
	return getter;
};

export const doUpdateStatusBillingPasien = ( uid ) => {
	const getter = db.ref(`pasiens/${uid}`).update({
		flagActivity : "userIdle",
	});
	return getter;
};

export const doUpdateStatusApotekPasien = ( uid ) => {
	const getter = db.ref(`pasiens/${uid}`).update({
		flagActivity : "ambilObatDone",
	});
	return getter;
};

export const doUpdateDokterPoli1 = ( dokterName ) => {
	const getter = db.ref(`poliklinik`).update({
		dokter1 : dokterName,
	});
	return getter;
};

export const doUpdateDokterPoli2 = ( dokterName ) => {
	const getter = db.ref(`poliklinik`).update({
		dokter2 : dokterName,
	});
	return getter;
};

export const doPasienDaftarAntrian = ( uid, nomorAntrian ) => {
	db.ref(`daftarTunggu/${uid}`).update({
		nomorAntrianPasien: nomorAntrian,
	});
	db.ref(`daftarTunggu`).update({
		nomorAntrian: nomorAntrian,
	});
};

export const onceGetUsers = () => {
	db.ref("users").once("value");
};

export const GetAllPasien = ( param1 ) => {
	const getter = db.ref(`pasiens`).orderByChild("role").equalTo(`${param1}`).once("value");
	return getter;
};

export const GetAllPasienStatusTungguNOK = () => {
	const getter = db.ref(`pasiens`).orderByChild("flagActivity").equalTo("userIdle").once("value");
	return getter;
};

export const GetAllPasienStatusBillingNOK = () => {
	const getter = db.ref(`pasiens`).orderByChild("flagActivity").equalTo("ambilObatDone").once("value");
	return getter;
};

export const GetAllPasienStatusApotekNOK = () => {
	const getter = db.ref(`pasiens`).orderByChild("flagActivity").equalTo("hasilObatDone").once("value");
	return getter;
};

export const GetLihatDaftarTunggu = () => {
	const getter = db.ref("pasiens").orderByChild("flagActivity").equalTo("antriPoliklinik").once("value");
	return getter;
};

export const GetRekamMedikPasien = (uid) => {
	const getter = db.ref(`pasiens/${uid}`).once("value");
	return getter;
};

export const GetSingleUsers = (uid) => {
	const resUser = db.ref(`users/${uid}`).once("value");
	return resUser;
};

export const getNumberLastAntrian = () => {
	const resUser = db.ref(`daftarTunggu/nomorAntrian`).once("value");
	return resUser;
};

export const getNomorAntrianPasien = ( uid ) => {
	const resUser = db.ref(`daftarTunggu/${uid}/nomorAntrianPasien`).once("value");
	return resUser;
};