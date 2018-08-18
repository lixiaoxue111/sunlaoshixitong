<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item label="选择日期">
					<el-select v-model="filters.term" placeholder="请选择">
						<el-option label="2016-2017-1" value="shanghai"></el-option>
						<el-option label="2016-2017-2" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange"  height="360" style="width: 140%;">
			<el-table-column type="selection" width="38" fixed>
			</el-table-column>
			<el-table-column type="index" width="68" fixed>
			</el-table-column>
			<el-table-column prop="name" label="科研名称" width="130" sortable>
			</el-table-column>
			<el-table-column prop="tNum" label="教师编号" width="140" :formatter="formatSex" sortable>
			</el-table-column>
			<el-table-column prop="pNum" label="项目编号" width="140" sortable>
			</el-table-column>
			<el-table-column prop="fNum" label="学校财务编号" width="140" sortable>
			</el-table-column>
			<el-table-column prop="pSource" label="项目来源" min-width="140" sortable>
			</el-table-column>
			<el-table-column prop="start" label="开始时间" min-width="140" sortable>
			</el-table-column>
			<el-table-column prop="end" label="结束时间" min-width="140" sortable>
			</el-table-column>
			<el-table-column prop="funds" label="审批经费" min-width="140" sortable>
			</el-table-column>
			<el-table-column prop="accountOutlay" label="已到账经费" min-width="140" sortable>
			</el-table-column>
			<el-table-column prop="yAccountOutlay" label="本年到账经费" min-width="140" sortable>
			</el-table-column>
			<el-table-column prop="accountTime" label="本年到账时间" min-width="140" sortable>
			</el-table-column>
			<el-table-column prop="first" label="是否首次拨款" min-width="140" sortable>
			</el-table-column>
			<el-table-column prop="rank" label="我校排名" min-width="140" sortable>
			</el-table-column>
			<el-table-column prop="score" label="得分系数" min-width="140" sortable>
			</el-table-column>
			<el-table-column prop="category" label="类别" min-width="140" sortable>
			</el-table-column>
			<el-table-column prop="standard" label="底分标准(分/项)" min-width="150" sortable>
			</el-table-column>
			<el-table-column prop="add" label="附加得分(分/万)" min-width="150" sortable>
			</el-table-column>
			<el-table-column prop="reward" label="奖励得分" min-width="140" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150" fixed="right">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--修改界面-->
		<el-dialog title="修改辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
				<el-form-item label="科研名称" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="教师编号" prop="tNum">
					<el-input v-model="editForm.name" auto-complete="off" placeholder="130079" disabled></el-input>
				</el-form-item>
				<el-form-item label="项目编号" prop="pNum">
					<el-input v-model="editForm.tNum" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="学校财务编号" prop="fNum">
					<el-input v-model="editForm.fNum" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="项目来源" prop="pSource">
					<el-input v-model="editForm.pSource" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="开始时间">
					<el-date-picker type="date" placeholder="选择日期" v-model="start"></el-date-picker>
				</el-form-item>
				<el-form-item label="结束时间">
					<el-date-picker type="date" placeholder="选择日期" v-model="end"></el-date-picker>
				</el-form-item>
				<el-form-item label="审批经费" prop="funds">
					<el-input v-model="editForm.funds" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="已到账经费" prop="accountOutlay">
					<el-input v-model="editForm.accountOutlay" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="本年到账经费" prop="yAccountOutlay">
					<el-input v-model="editForm.yAccountOutlay" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="本年到账时间">
					<el-date-picker type="date" placeholder="选择日期" v-model="accountTime"></el-date-picker>
				</el-form-item>
				<el-form-item label="是否首次拨款">
					<el-radio-group v-model="editForm.first">
						<el-radio class="radio" :label="1">是</el-radio>
						<el-radio class="radio" :label="0">否</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="我校排名">
					<el-select v-model="editForm.rank" placeholder="请选择">
						<el-option label="1" value="1"></el-option>
						<el-option label="2" value="2"></el-option>
						<el-option label="3" value="3"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="类别">
					<el-select v-model="editForm.category" placeholder="请选择">
						<el-option label="国家级科研课题" value="国家级科研课题"></el-option>
						<el-option label="其他各类纵向科研及国际合作科研" value="其他各类纵向科研及国际合作科研"></el-option>
						<el-option label="横向.校内科研" value="横向.校内科研"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="填写时间">
					<el-input placeholder="2016-2017-1" v-model="editForm.time" disabled></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
				<el-form-item label="科研名称" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="教师编号" prop="tNum">
					<el-input v-model="editForm.name" auto-complete="off" placeholder="130079" disabled></el-input>
				</el-form-item>
				<el-form-item label="项目编号" prop="pNum">
					<el-input v-model="editForm.tNum" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="学校财务编号" prop="fNum">
					<el-input v-model="editForm.fNum" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="项目来源" prop="pSource">
					<el-input v-model="editForm.pSource" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="开始时间">
					<el-date-picker type="date" placeholder="选择日期" v-model="start"></el-date-picker>
				</el-form-item>
				<el-form-item label="结束时间">
					<el-date-picker type="date" placeholder="选择日期" v-model="end"></el-date-picker>
				</el-form-item>
				<el-form-item label="审批经费" prop="funds">
					<el-input v-model="editForm.funds" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="已到账经费" prop="accountOutlay">
					<el-input v-model="editForm.accountOutlay" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="本年到账经费" prop="yAccountOutlay">
					<el-input v-model="editForm.yAccountOutlay" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="本年到账时间">
					<el-date-picker type="date" placeholder="选择日期" v-model="accountTime"></el-date-picker>
				</el-form-item>
				<el-form-item label="是否首次拨款">
					<el-radio-group v-model="editForm.first">
						<el-radio class="radio" :label="1">是</el-radio>
						<el-radio class="radio" :label="0">否</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="我校排名">
					<el-select v-model="editForm.rank" placeholder="请选择">
						<el-option label="1" value="1"></el-option>
						<el-option label="2" value="2"></el-option>
						<el-option label="3" value="3"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="类别">
					<el-select v-model="editForm.category" placeholder="请选择">
						<el-option label="国家级科研课题" value="国家级科研课题"></el-option>
						<el-option label="其他各类纵向科研及国际合作科研" value="其他各类纵向科研及国际合作科研"></el-option>
						<el-option label="横向.校内科研" value="横向.校内科研"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="填写时间">
					<el-input placeholder="2016-2017-1" v-model="editForm.time" disabled></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script> 
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					term: ''
				},
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//修改界面数据
				editForm: {
					id: 0,
					name: '',
					tNum: '',
					pNum: '',
					fNum: '',
					pSource: '',
					funds: '',
					accountOutlay: '',
					yAccountOutlay: '',
					first: '',
					rank: '',
					category: '',
					time: ''
				},
				start: '',
				end: '',
				accountTime: '',

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					id: 0,
					name: '',
					tNum: '',
					pNum: '',
					fNum: '',
					pSource: '',
					funds: '',
					accountOutlay: '',
					yAccountOutlay: '',
					first: '',
					rank: '',
					category: '',
					time: ''
				},
				start: '',
				end: '',
				accountTime: '',

			}
		},
		methods: {
			/* //性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			}, */
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					name: this.filters.term
				};
				this.listLoading = true;
				//NProgress.start();
				getUserListPage(para).then((res) => {
					this.total = res.data.total;
					this.users = res.data.users;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					removeUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			},
			//显示修改界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				};
			},
			//修改
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							para.start = (!para.start || para.start == '') ? '' : util.formatDate.format(new Date(para.start), 'yyyy-MM-dd');

							editUser(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							addUser(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			}
		},
		mounted() {
			this.getUsers();
		}
	}

</script>

<style scoped>	
	.el-table{
		font-size:12px;
	}
</style>