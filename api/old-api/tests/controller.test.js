const { getMockReq, getMockRes } = require('@jest-mock/express');
const controller = require('../src/controller');

describe("Testing the controller", () => {
    const { res, next, clearMockRes } = getMockRes();

    beforeEach(() => {
        clearMockRes()
    })

    test('will respond with the entity from the service', async () => {
        const req = getMockReq();

        // await controller.test(req, res);

        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                id: 'test'
            })
        );
    });

    test('Get blade history', async () => {
        const req = getMockReq();

        await controller.getBladeHistory(req, res);

        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                MikeSerialNum: expect.any(String),
                locationNumber: expect.any(String),
                franchiseNumber: expect.any(Number),
                storeNumber: expect.any(Number),
                storeId: expect.any(Number),
            })
        );
    });
});
