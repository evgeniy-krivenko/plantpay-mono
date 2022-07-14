export const VendorOrderServiceMock = () => ({
  createOrder: jest.fn().mockResolvedValue('vendorOrderId'),
});
