const Student = require('../models/Student');
const AttendanceList = require('../models/Attendancelist');
const Attendance = require('../models/Attendance');
const department = require('../models/Department');

exports.getDashboardData = async (req, res) => {
  try {
    const studentCount = await Student.countDocuments();
    const departmentCount = await department.countDocuments();
    const notRecognizedCount = await Attendance.countDocuments({ status: 0 || null });
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 6);
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - ((dayOfWeek + 2)));
    startOfWeek.setHours(0, 0, 0, 0);

    const filter = {
      created_at: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    };

    const newlyregisteredCount = await Student.countDocuments({ created_at: { $gte: sixMonthsAgo, $lte: endOfDay } });
    const attendanceCount = await AttendanceList.countDocuments(filter);

    const graphMonthly = await AttendanceList.aggregate([
      {
        $match: {
          created_at: { $gte: sixMonthsAgo, $lte: endOfDay },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$created_at" },
            month: { $month: "$created_at" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
      {
        $project: {
          month: {
            $concat: [
              {
                $arrayElemAt: [
                  ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"],
                  { $subtract: ["$_id.month", 1] }
                ]
              },
              " ",
              { $toString: "$_id.year" }
            ],
          },
          count: 1,
        },
      },
    ]);

    const graphWeekly = await AttendanceList.aggregate([
      {
        $match: {
          created_at: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$created_at" },
            week: { $week: "$created_at" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.month": 1, "_id.week": 1 },
      },
      {
        $project: {
          week: {
            $concat: [
              "Week ",
              { $toString: "$_id.week" }
            ],
          },
          count: 1,
        },
      },
    ]);

    const notifcationData = await AttendanceList.aggregate([
      {
        $match: {
          created_at: { $gte: startOfWeek, $lte: endOfDay },
        },
      },
      {
        $group: {
          _id: { day: { $dayOfWeek: "$created_at" } },
          presentStudentIds: { $addToSet: "$student_id" },
        },
      },
      {
        $group: {
          _id: null,
          days: {
            $push: {
              day: "$_id.day",
              presentStudentIds: "$presentStudentIds",
            },
          },
        },
      },
      {
        $project: {
          commonStudents: {
            $reduce: {
              input: "$days.presentStudentIds",
              initialValue: [],
              in: {
                $cond: [
                  { $eq: ["$$value", []] },
                  "$$this",
                  { $setIntersection: ["$$value", "$$this"] },
                ],
              },
            },
          },
        },
      },
      {
        $lookup: {
          from: "students",
          localField: "commonStudents",
          foreignField: "_id",
          as: "commonStudentsDetails",
        },
      },
      {
        $project: {
          commonStudentsDetails: 1,
        },
      },
    ]);

    const dashboardData = {
      students_total: studentCount,
      attendances: attendanceCount,
      departments: departmentCount,
      not_recognized: notRecognizedCount,
      students_last_reg: newlyregisteredCount,
      graph_month: graphMonthly,
      graph_week: graphWeekly,
      notifcation_data: notifcationData
    };

    res.status(200).json({ status: true, message: "Dashboard data fetched successfully", data: dashboardData });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
};