const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Các API liên quan đến sản phẩm
 */

/**
 * @swagger
 * /products:
 *   post:
 *     tags: [Product]
 *     summary: Thêm một con cá Koi mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - origin
 *               - breed
 *               - gender
 *               - age
 *               - size
 *               - price
 *               - healthStatus
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Cá Koi Vàng"
 *               origin:
 *                 type: string
 *                 example: "Nhật Bản"
 *               breed:
 *                 type: string
 *                 example: "Kohaku"
 *               gender:
 *                 type: string
 *                 enum: [Nam, Nữ]
 *                 example: "Nam"
 *               age:
 *                 type: number
 *                 example: 2
 *               size:
 *                 type: number
 *                 example: 30
 *               personality:
 *                 type: string
 *                 example: "Điềm tĩnh"
 *               dailyFeedAmount:
 *                 type: number
 *                 description: Lượng thức ăn mỗi ngày tính bằng gram
 *                 example: 50
 *               screeningRate:
 *                 type: number
 *                 description: Tỷ lệ sàng lọc tính theo phần trăm
 *                 example: 3
 *               healthStatus:
 *                 type: string
 *                 description: Tình trạng sức khỏe của cá Koi
 *                 example: "Khỏe mạnh"
 *               imageUrl:
 *                 type: string
 *                 description: URL hình ảnh của cá Koi
 *                 example: "https://example.com/image.jpg"
 *               price:
 *                 type: number
 *                 description: Giá của cá Koi
 *                 example: 200
 *               status:
 *                 type: string
 *                 enum: [Có sẵn, Đã bán, Đang chờ, Không bán]
 *                 example: "Có sẵn"
 *               category:
 *                 type: string
 *                 description: ID của danh mục cá Koi
 *                 example: "60d21b4667d0d8992e610c85"
 *     responses:
 *       201:
 *         description: Cá Koi đã được thêm thành công.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cá Koi đã được thêm thành công."
 *                 data:
 *                   $ref: '#/components/schemas/Koi'
 *       400:
 *         description: Dữ liệu không hợp lệ.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Tên là bắt buộc"
 *       422:
 *         description: Lỗi xác thực.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Tuổi phải là số dương."
 *       500:
 *         description: Lỗi máy chủ nội bộ.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Lỗi máy chủ nội bộ."
 */
router.post('/', productController.create);

/**
 * @swagger
 * /products:
 *   get:
 *     tags: [Product]
 *     summary: Lấy danh sách tất cả cá Koi
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: "Số trang cho phân trang (ví dụ: 1, 2, 3)"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: "Giới hạn số lượng sản phẩm mỗi trang (ví dụ: 10, 20, 50)"
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           example: 67135ffb22a6b877d0866c13
 *         description: "ID của danh mục cá Koi"
 *     responses:
 *       200:
 *         description: Danh sách cá Koi.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: Tổng số cá Koi có sẵn.
 *                   example: 100
 *                 page:
 *                   type: integer
 *                   description: Số trang hiện tại.
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   description: Số lượng sản phẩm mỗi trang.
 *                   example: 10
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Koi'
 *       400:
 *         description: Yêu cầu không hợp lệ. Tham số truy vấn không hợp lệ.
 *       404:
 *         description: Không tìm thấy cá Koi nào.
 *       500:
 *         description: Lỗi máy chủ nội bộ.
 */
router.get('/', productController.getAll);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     tags: [Product]
 *     summary: Lấy cá Koi theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của cá Koi
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cá Koi đã tìm thấy.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Koi'
 *       400:
 *         description: Định dạng ID không hợp lệ.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Định dạng ID không hợp lệ"
 *       404:
 *         description: Không tìm thấy cá Koi.
 *       500:
 *         description: Lỗi máy chủ nội bộ.
 */
router.get('/:id', productController.getById);

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     tags: [Product]
 *     summary: Cập nhật cá Koi theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của cá Koi
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Cá Koi Vàng"
 *               origin:
 *                 type: string
 *                 example: "Nhật Bản"
 *               breed:
 *                 type: string
 *                 example: "Kohaku"
 *               gender:
 *                 type: string
 *                 enum: [Nam, Nữ]
 *                 example: "Nam"
 *               age:
 *                 type: number
 *                 example: 3
 *               size:
 *                 type: number
 *                 example: 35
 *               personality:
 *                 type: string
 *                 example: "Năng động"
 *               dailyFeedAmount:
 *                 type: number
 *                 description: Lượng thức ăn mỗi ngày tính bằng gram
 *                 example: 60
 *               screeningRate:
 *                 type: number
 *                 description: Tỷ lệ sàng lọc tính theo phần trăm
 *                 example: 4
 *               healthStatus:
 *                 type: string
 *                 description: Tình trạng sức khỏe của cá Koi
 *                 example: "Khỏe mạnh"
 *               imageUrl:
 *                 type: string
 *                 description: URL hình ảnh của cá Koi
 *                 example: "https://example.com/image.jpg"
 *               price:
 *                 type: number
 *                 description: Giá của cá Koi
 *                 example: 250
 *               status:
 *                 type: string
 *                 enum: [Có sẵn, Đã bán, Đang chờ, Không bán]
 *                 example: "Có sẵn"
 *               isImportedPurebred:
 *                 type: boolean
 *                 description: Liệu cá Koi có phải là giống thuần chủng nhập khẩu không
 *                 example: true
 *               isF1Hybrid:
 *                 type: boolean
 *                 description: Liệu cá Koi có phải là giống F1 lai không
 *                 example: false
 *               isPureVietnamese:
 *                 type: boolean
 *                 description: Liệu cá Koi có phải là giống thuần Việt không
 *                 example: false
 *               categoryId:
 *                 type: string
 *                 description: ID của danh mục cá Koi
 *                 example: "60d21b4667d0d8992e610c85"
 *     responses:
 *       200:
 *         description: Cá Koi đã được cập nhật thành công.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cá Koi đã được cập nhật thành công."
 *                 data:
 *                   $ref: '#/components/schemas/Koi'
 *       400:
 *         description: Dữ liệu không hợp lệ.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Tên là bắt buộc"
 *       404:
 *         description: Không tìm thấy cá Koi.
 *       500:
 *         description: Lỗi máy chủ nội bộ.
 */
router.patch('/:id', productController.update);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     tags: [Product]
 *     summary: Xóa cá Koi theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của cá Koi
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cá Koi đã được xóa thành công.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cá Koi đã được xóa thành công."
 *       400:
 *         description: Định dạng ID không hợp lệ.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Định dạng ID không hợp lệ"
 *       404:
 *         description: Không tìm thấy cá Koi.
 *       500:
 *         description: Lỗi máy chủ nội bộ.
 */
router.delete('/:id', productController.delete);

module.exports = router;
