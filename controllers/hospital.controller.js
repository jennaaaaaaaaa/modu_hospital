const HospitalService = require('../services/hospital.service');

class HospitalController {
    hospitalService = new HospitalService();

    findNearHospital = async (req, res) => {
        const { right, left, right1, left1 } = req.body;

        const hospitals = await this.hospitalService.findNearHospital(right, left, right1, left1);

        res.json({ hospitals });
    };

    // 예약관리 조회
    findAllReservation = async (req, res, next) => {
        try {
            const data = await this.hospitalService.findAllReservation();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    // 예약관리 수정
    editReservation = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { date, status } = req.body;
            const updateReservation = await this.hospitalService.editReservation(id, date, status);
            res.status(200).json({ data: updateReservation });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
}

module.exports = HospitalController;
