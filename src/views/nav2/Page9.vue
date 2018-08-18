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
			<el-table-column prop="name" label="学术竞赛名称" width="180" sortable>
			</el-table-column>
			<el-table-column prop="tNum" label="教师编号" width="140" :formatter="formatSex" sortable>
			</el-table-column>
			<el-table-column prop="approvalUnit" label="批准单位" width="140" sortable>
			</el-table-column>
			<el-table-column prop="aDate" label="批准时间" width="140" sortable>
			</el-table-column>
			<el-table-column prop="category" label="类别" min-width="140" sortable>
			</el-table-column>
			<el-table-column prop="standard" label="得分标准" min-width="140" sortable>
			</el-table-column>
			<el-table-column prop="score" label="奖励得分" min-width="140" sortable>
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
		<el-dialog title="修改" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="150px" :rules="editFormRules" ref="editForm">
				<el-form-item label="竞赛及创新项目名称" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="教师编号" prop="tNum">
					<el-input v-model="editForm.tNum" auto-complete="off" placeholder="130079" disabled></el-input>
				</el-form-item>
				<el-form-item label="批准单位" prop="approvalUnit">
					<el-input v-model="editForm.approvalUnit" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="批准日期" prop="aDate">
					<el-date-picker type="date" placeholder="选择日期" v-model="aDate"></el-date-picker>
				</el-form-item>
				<el-form-item label="类别">
					<el-select v-model="editForm.category" placeholder="请选择">
						<el-option label="国家级学生科技学术竞赛一等奖指导老师" value="国家级学生科技学术竞赛一等奖指导老师"></el-option>						
						<el-option label="国家级学生科技学术竞赛二等奖指导老师" value="国家级学生科技学术竞赛二等奖指导老师"></el-option>						
						<el-option label="国家级学生科技学术竞赛三等奖指导老师" value="国家级学生科技学术竞赛三等奖指导老师"></el-option>						
						<el-option label="国家级学生科技学术竞赛优秀奖指导老师" value="国家级学生科技学术竞赛优秀奖指导老师"></el-option>						
						<el-option label="省级(或企业承办的全国性竞赛)竞赛一等奖指导老师" value="省级(或企业承办的全国性竞赛)竞赛一等奖指导老师"></el-option>						
						<el-option label="省级(或企业承办的全国性竞赛)竞赛二等奖指导老师" value="省级(或企业承办的全国性竞赛)竞赛二等奖指导老师"></el-option>						
						<el-option label="省级(或企业承办的全国性竞赛)竞赛三等奖指导老师" value="省级(或企业承办的全国性竞赛)竞赛三等奖指导老师"></el-option>						
						<el-option label="国家级学生创新项目结题指导教师团队" value="国家级学生创新项目结题指导教师团队"></el-option>						
						<el-option label="校级学生创新项目结题指导教师团队" value="校级学生创新项目结题指导教师团队"></el-option>						
						<el-option label="院级学生创新项目结题指导教师团队" value="院级学生创新项目结题指导教师团队"></el-option>						
						<el-option label="省级(或企业承办的全国性竞赛）竞赛优秀奖指导教师" value="省级(或企业承办的全国性竞赛）竞赛优秀奖指导教师"></el-option>						
						<el-option label="学生创新项目指导教师科研训练项目" value="学生创新项目指导教师科研训练项目"></el-option>												
					</el-select>
				</el-form-item>		
				<el-form-item label="填写日期">
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
			<el-form :model="editForm" label-width="150px" :rules="editFormRules" ref="editForm">
				<el-form-item label="竞赛及创新项目名称" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="教师编号" prop="tNum">
					<el-input v-model="editForm.tNum" auto-complete="off" placeholder="130079" disabled></el-input>
				</el-form-item>
				<el-form-item label="批准单位" prop="approvalUnit">
					<el-input v-model="editForm.approvalUnit" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="批准日期" prop="aDate">
					<el-date-picker type="date" placeholder="选择日期" v-model="aDate"></el-date-picker>
				</el-form-item>
				<el-form-item label="类别">
					<el-select v-model="editForm.category" placeholder="请选择">
						<el-option label="国家级学生科技学术竞赛一等奖指导老师" value="国家级学生科技学术竞赛一等奖指导老师"></el-option>						
						<el-option label="国家级学生科技学术竞赛二等奖指导老师" value="国家级学生科技学术竞赛二等奖指导老师"></el-option>						
						<el-option label="国家级学生科技学术竞赛三等奖指导老师" value="国家级学生科技学术竞赛三等奖指导老师"></el-option>						
						<el-option label="国家级学生科技学术竞赛优秀奖指导老师" value="国家级学生科技学术竞赛优秀奖指导老师"></el-option>						
						<el-option label="省级(或企业承办的全国性竞赛)竞赛一等奖指导老师" value="省级(或企业承办的全国性竞赛)竞赛一等奖指导老师"></el-option>						
						<el-option label="省级(或企业承办的全国性竞赛)竞赛二等奖指导老师" value="省级(或企业承办的全国性竞赛)竞赛二等奖指导老师"></el-option>						
						<el-option label="省级(或企业承办的全国性竞赛)竞赛三等奖指导老师" value="省级(或企业承办的全国性竞赛)竞赛三等奖指导老师"></el-option>						
						<el-option label="国家级学生创新项目结题指导教师团队" value="国家级学生创新项目结题指导教师团队"></el-option>						
						<el-option label="校级学生创新项目结题指导教师团队" value="校级学生创新项目结题指导教师团队"></el-option>						
						<el-option label="院级学生创新项目结题指导教师团队" value="院级学生创新项目结题指导教师团队"></el-option>						
						<el-option label="省级(或企业承办的全国性竞赛）竞赛优秀奖指导教师" value="省级(或企业承办的全国性竞赛）竞赛优秀奖指导教师"></el-option>						
						<el-option label="学生创新项目指导教师科研训练项目" value="学生创新项目指导教师科研训练项目"></el-option>												
					</el-select>
				</el-form-item>		
				<el-form-item label="填写日期">
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

				editFormVisible: false,//修改界面是否显示
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
					approvalUnit: '',	
					category: ''
				},
				aDate: '',

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
					approvalUnit: '',
					category: ''
				},
				aDate: '',

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
							para.pDate = (!para.pDate || para.pDate == '') ? '' : util.formatDate.format(new Date(para.pDate), 'yyyy-MM-dd');

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
							para.pDate = (!para.pDate || para.pDate == '') ? '' : util.formatDate.format(new Date(para.pDate), 'yyyy-MM-dd');
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