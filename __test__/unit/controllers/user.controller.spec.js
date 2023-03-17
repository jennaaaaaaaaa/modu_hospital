const { describe, beforeEach } = require('node:test');
const UserController = require('../../../controllers/user.controller');

let mockUserService = {
    getUserProfile: jest.fn(),
    editUserProfile: jest.fn(),
    getApprovedReservation: jest.fn(),
    getWaitingReservation: jest.fn(),
    getDoneOrReviewedReservation: jest.fn(),
    getCanceledReservation: jest.fn(),
};
let mockReservationService = {
    cancelReservation: jest.fn(),
};

let mockRequest = {
    body: jest.fn(),
    params: jest.fn(),
    query: jest.fn(),
};

let mockResponse = {
    json: jest.fn(),
};

let mockNext = jest.fn();

const userController = new UserController();
userController.userService = mockUserService;
userController.reservationService = mockReservationService;

describe('User Controller Unit Test', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('getUserProfile', () => {
        it('should call service method once', async () => {
            const userProfile = {
                userId: 1,
                loginId: 'abcd',
                name: '김상철',
                phone: '010-1234-1235',
                address: '서울특별시 관악구 봉천동 남부순환로 1814 대연빌딩 1층 2층 6층',
            };
            mockUserService.getUserProfile.mockResolvedValue(userProfile);
            await userController.getUserProfile(mockRequest, mockResponse, mockNext);
            expect(mockUserService.getUserProfile).toHaveBeenCalledTimes(1);
        });
    });
    describe('editUserProfile', () => {
        it('should call service method once', async () => {
            await userController.editUserProfile(mockRequest, mockResponse, mockNext);
            expect(mockUserService.editUserProfile).toHaveBeenCalledTimes(1);
        });
    });
    describe(getApprovedReservation, () => {
        it('should call service method once', async () => {
            await userController.getApprovedReservation(mockRequest, mockResponse, mockNext);
            expect(mockUserService.getApprovedReservation).toHaveBeenCalledTimes(1);
        });
        it('should call service method with proper arguments', async () => {
            mockRequest.query = { page: 1 };
            await userController.getApprovedReservation(mockRequest, mockResponse, mockNext);
            expect(mockUserService.getApprovedReservation).toHaveBeenCalledWith(
                mockRequest.query.page
            );
        });
        it('should return proper Data', async () => {
            mockRequest.query = { page: 1 };
            const approved = [
                {
                    hospitalName: '삼성서울병원',
                    doctorName: '김닥터',
                    doctorImage:
                        'https://mblogthumb-phinf.pstatic.net/MjAxOTA0MjFfNzEg/MDAxNTU1ODUyNjA1ODMx.S717xo_KomAdcNK5hCSua-Cz7gDpUyf1oXxj_vfVm44g.lFLDNYIdZnbU2n4_qyhODB4bKY_i7zsS4z8RHdlELOYg.JPEG.akswp1224/1.jpg?type=w2',
                    date: '2023-03-06T06:50:00.000Z',
                    id: 6,
                    status: 'approved',
                },
                {
                    hospitalName: '삼성서울병원',
                    doctorName: '김닥터',
                    doctorImage:
                        'https://mblogthumb-phinf.pstatic.net/MjAxOTA0MjFfNzEg/MDAxNTU1ODUyNjA1ODMx.S717xo_KomAdcNK5hCSua-Cz7gDpUyf1oXxj_vfVm44g.lFLDNYIdZnbU2n4_qyhODB4bKY_i7zsS4z8RHdlELOYg.JPEG.akswp1224/1.jpg?type=w2',
                    date: '2023-03-05T09:50:00.000Z',
                    id: 5,
                    status: 'approved',
                },
            ];
            mockUserService.getApprovedReservation.mockResolvedValue(approved);
            await userController.getApprovedReservation(mockRequest, mockResponse, mockNext);
            expect(mockResponse.json).toMatchObject(approved);
        });
    });
    describe(getWaitingReservation, () => {
        it('should call service method once', async () => {
            await userController.getWaitingReservation(mockRequest, mockResponse, mockNext);
            expect(mockUserService.userService.getWaitingReservation).toHaveBeenCalledTimes(1);
        });
        it('should call service method with proper arguments', async () => {
            mockRequest.query = { page: 1 };
            await userController.getWaitingReservation(mockRequest, mockResponse, mockNext);
            expect(mockUserService.userService.getWaitingReservation).toHaveBeenCalledWith(
                mockRequest.query.page
            );
        });
        it('should return proper Data', async () => {
            mockRequest.query = { page: 1 };
            const waiting = [
                {
                    hospitalName: '삼성서울병원',
                    doctorName: '김닥터',
                    doctorImage:
                        'https://mblogthumb-phinf.pstatic.net/MjAxOTA0MjFfNzEg/MDAxNTU1ODUyNjA1ODMx.S717xo_KomAdcNK5hCSua-Cz7gDpUyf1oXxj_vfVm44g.lFLDNYIdZnbU2n4_qyhODB4bKY_i7zsS4z8RHdlELOYg.JPEG.akswp1224/1.jpg?type=w2',
                    date: '2023-03-06T06:50:00.000Z',
                    id: 6,
                    status: 'waiting',
                },
                {
                    hospitalName: '삼성서울병원',
                    doctorName: '김닥터',
                    doctorImage:
                        'https://mblogthumb-phinf.pstatic.net/MjAxOTA0MjFfNzEg/MDAxNTU1ODUyNjA1ODMx.S717xo_KomAdcNK5hCSua-Cz7gDpUyf1oXxj_vfVm44g.lFLDNYIdZnbU2n4_qyhODB4bKY_i7zsS4z8RHdlELOYg.JPEG.akswp1224/1.jpg?type=w2',
                    date: '2023-03-05T09:50:00.000Z',
                    id: 5,
                    status: 'waiting',
                },
            ];
            mockUserService.getWaitingReservation.mockResolvedValue(waiting);
            await userController.getWaitingReservation(mockRequest, mockResponse, mockNext);
            expect(mockResponse.json).toMatchObject(waiting);
        });
    });
    describe(getDoneOrReviewedReservation, () => {
        it('should call service method once', async () => {
            await userController.getDoneOrReviewedReservation(mockRequest, mockResponse, mockNext);
            expect(mockUserService.userService.getDoneOrReviewedReservation).toHaveBeenCalledTimes(
                1
            );
        });
        it('should call service method with proper arguments', async () => {
            mockRequest.query = { page: 1 };
            await userController.getDoneOrReviewedReservation(mockRequest, mockResponse, mockNext);
            expect(mockUserService.userService.getDoneOrReviewedReservation).toHaveBeenCalledWith(
                mockRequest.query.page
            );
        });
        it('should return proper Data', async () => {
            mockRequest.query = { page: 1 };
            const doneOrReviewed = [
                {
                    hospitalName: '삼성서울병원',
                    doctorName: '김닥터',
                    doctorImage:
                        'https://mblogthumb-phinf.pstatic.net/MjAxOTA0MjFfNzEg/MDAxNTU1ODUyNjA1ODMx.S717xo_KomAdcNK5hCSua-Cz7gDpUyf1oXxj_vfVm44g.lFLDNYIdZnbU2n4_qyhODB4bKY_i7zsS4z8RHdlELOYg.JPEG.akswp1224/1.jpg?type=w2',
                    date: '2023-03-06T06:50:00.000Z',
                    id: 6,
                    status: 'doneOrReviewed',
                },
                {
                    hospitalName: '삼성서울병원',
                    doctorName: '김닥터',
                    doctorImage:
                        'https://mblogthumb-phinf.pstatic.net/MjAxOTA0MjFfNzEg/MDAxNTU1ODUyNjA1ODMx.S717xo_KomAdcNK5hCSua-Cz7gDpUyf1oXxj_vfVm44g.lFLDNYIdZnbU2n4_qyhODB4bKY_i7zsS4z8RHdlELOYg.JPEG.akswp1224/1.jpg?type=w2',
                    date: '2023-03-05T09:50:00.000Z',
                    id: 5,
                    status: 'doneOrReviewed',
                },
            ];
            mockUserService.getDoneOrReviewedReservation.mockResolvedValue(doneOrReviewed);
            await userController.getDoneOrReviewedReservation(mockRequest, mockResponse, mockNext);
            expect(mockResponse.json).toMatchObject(doneOrReviewed);
        });
    });
    describe(getCanceledReservation, () => {
        it('should call service method once', async () => {
            await userController.getCanceledReservation(mockRequest, mockResponse, mockNext);
            expect(mockUserService.userService.getCanceledReservation).toHaveBeenCalledTimes(1);
        });
        it('should call service method with proper arguments', async () => {
            mockRequest.query = { page: 1 };
            await userController.getCanceledReservation(mockRequest, mockResponse, mockNext);
            expect(mockUserService.userService.getCanceledReservation).toHaveBeenCalledWith(
                mockRequest.query.page
            );
        });
        it('should return proper Data', async () => {
            mockRequest.query = { page: 1 };
            const canceled = [
                {
                    hospitalName: '삼성서울병원',
                    doctorName: '김닥터',
                    doctorImage:
                        'https://mblogthumb-phinf.pstatic.net/MjAxOTA0MjFfNzEg/MDAxNTU1ODUyNjA1ODMx.S717xo_KomAdcNK5hCSua-Cz7gDpUyf1oXxj_vfVm44g.lFLDNYIdZnbU2n4_qyhODB4bKY_i7zsS4z8RHdlELOYg.JPEG.akswp1224/1.jpg?type=w2',
                    date: '2023-03-06T06:50:00.000Z',
                    id: 6,
                    status: 'canceled',
                },
                {
                    hospitalName: '삼성서울병원',
                    doctorName: '김닥터',
                    doctorImage:
                        'https://mblogthumb-phinf.pstatic.net/MjAxOTA0MjFfNzEg/MDAxNTU1ODUyNjA1ODMx.S717xo_KomAdcNK5hCSua-Cz7gDpUyf1oXxj_vfVm44g.lFLDNYIdZnbU2n4_qyhODB4bKY_i7zsS4z8RHdlELOYg.JPEG.akswp1224/1.jpg?type=w2',
                    date: '2023-03-05T09:50:00.000Z',
                    id: 5,
                    status: 'canceled',
                },
            ];
            mockUserService.getCanceledReservation.mockResolvedValue(canceled);
            await userController.getCanceledReservation(mockRequest, mockResponse, mockNext);
            expect(mockResponse.json).toMatchObject(canceled);
        });
    });
    describe('cancelReservation', () => {
        it('should call service method once', async () => {
            mockRequest.params = { id: 1 };
            await userController.cancelReservation(mockRequest, mockResponse, mockNext);
            expect(userController.reservationService.cancelReservation).toHaveBeenCalledTimes(1);
        });
        it('should call service with proper arguments', async () => {
            mockRequest.params = { id: 1 };
            await userController.cancelReservation(mockRequest, mockResponse, mockNext);
            expect(userController.reservationService.cancelReservation).toHaveBeenCalledWith(
                mockRequest.params.id
            );
        });
    });
});
