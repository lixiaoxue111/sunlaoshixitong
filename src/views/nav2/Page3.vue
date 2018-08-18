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
			<el-table-column prop="name" label="论文名称" width="130" sortable>
			</el-table-column>
			<el-table-column prop="tNum" label="教师编号" width="140" :formatter="formatSex" sortable>
			</el-table-column>
			<el-table-column prop="periodical" label="期刊名称" width="140" sortable>
			</el-table-column>
			<el-table-column prop="publish" label="发表日期" width="140" sortable>
			</el-table-column>
			<el-table-column prop="rank" label="我校排名" min-width="140" sortable>
			</el-table-column>
			<el-table-column prop="score" label="得分系数" min-width="140" sortable>
			</el-table-column>
			<el-table-column prop="category" label="类别" min-width="140" sortable>
			</el-table-column>
			<el-table-column prop="accession" label="检索号" min-width="150" sortable>
			</el-table-column>
			<el-table-column prop="periodVolume" label="期卷号" min-width="150" sortable>
			</el-table-column>
			<el-table-column prop="start" label="起始页码" min-width="140" sortable>
			</el-table-column>
			<el-table-column prop="end" label="终止页码" min-width="140" sortable>
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
			<el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
				<el-form-item label="论文名称" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="教师编号" prop="tNum">
					<el-input v-model="editForm.tNum" auto-complete="off" placeholder="130079" disabled></el-input>
				</el-form-item>
				<el-form-item label="期刊名称" prop="periodical">
					<el-input v-model="editForm.periodical" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="发表日期" prop="publish">
					<el-date-picker type="date" placeholder="选择日期" v-model="publish"></el-date-picker>
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
						<el-option label="SCI检索" value="SCI检索"></el-option>
						<el-option label="EI" value="EI"></el-option>
						<el-option label="EI(会议)" value="EI(会议)"></el-option>
						<el-option label="ISTP" value="ISTP"></el-option>
						<el-option label="中文核心刊物A+类" value="中文核心刊物A+类"></el-option>
						<el-option label="中文核心刊物A类" value="中文核心刊物A类"></el-option>
						<el-option label="其他中文核心刊物" value="其他中文核心刊物"></el-option>
						<el-option label="国际学术会议(非双边)-特约报告" value="国际学术会议(非双边)-特约报告"></el-option>
						<el-option label="国际学术会议(非双边)-分组报告" value="国际学术会议(非双边)-分组报告"></el-option>
						<el-option label="国内或国际双边学术会议-特约报告" value="国内或国际双边学术会议-特约报告"></el-option>
						<el-option label="国内或国际双边学术会议-分组报告" value="国内或国际双边学术会议-分组报告"></el-option>
						<el-option label="补（中文核心A+期刊被SCI收录）" value="补（中文核心A+期刊被SCI收录）"></el-option>
						<el-option label="补（期刊EI被SCI收录）" value="补（期刊EI被SCI收录）"></el-option>
						<el-option label="补（会议EI被SCI收录）" value="补（会议EI被SCI收录）"></el-option>
						<el-option label="补（中文核心期刊A类被EI收录）" value="补（中文核心期刊A类被EI收录）"></el-option>
						<el-option label="JCR外的SCI-E" value="JCR外的SCI-E"></el-option>
						<el-option label="A类非核心，以及外文期刊非EI/SCI" value="A类非核心，以及外文期刊非EI/SCI"></el-option>
						<el-option label="中文核心A-" value="中文核心A-"></el-option>
						<el-option label="计算机学会推荐国际会议—特约报告A" value="计算机学会推荐国际会议—特约报告A"></el-option>
						<el-option label="计算机学会推荐国际会议—特约报告B" value="计算机学会推荐国际会议—特约报告B"></el-option>
						<el-option label="计算机学会推荐国际会议—特约报告C" value="计算机学会推荐国际会议—特约报告C"></el-option>
						<el-option label="计算机学会推荐国际会议—分组报告A" value="计算机学会推荐国际会议—分组报告A"></el-option>
						<el-option label="计算机学会推荐国际会议—分组报告B" value="计算机学会推荐国际会议—分组报告B"></el-option>
						<el-option label="计算机学会推荐国际会议—分组报告C" value="计算机学会推荐国际会议—分组报告C"></el-option>
						<el-option label="A+非中文核心" value="A+非中文核心"></el-option>
						<el-option label="教育教学研究论文" value="教育教学研究论文"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="检索号" prop="accession">
					<el-input v-model="editForm.accession" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="期卷号" prop="periodVolume">
					<el-input v-model="editForm.periodVolume" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="起始页码" prop="start">
					<el-input v-model="editForm.start" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="终止页码" prop="end">
					<el-input v-model="editForm.end" auto-complete="off"></el-input>
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
			<el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
				<el-form-item label="论文名称" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="教师编号" prop="tNum">
					<el-input v-model="editForm.tNum" auto-complete="off" placeholder="130079" disabled></el-input>
				</el-form-item>
				<el-form-item label="期刊名称" prop="periodical">
					<el-input v-model="editForm.periodical" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="发表日期" prop="publish">
					<el-date-picker type="date" placeholder="选择日期" v-model="publish"></el-date-picker>
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
						<el-option label="SCI检索" value="SCI检索"></el-option>
						<el-option label="EI" value="EI"></el-option>
						<el-option label="EI(会议)" value="EI(会议)"></el-option>
						<el-option label="ISTP" value="ISTP"></el-option>
						<el-option label="中文核心刊物A+类" value="中文核心刊物A+类"></el-option>
						<el-option label="中文核心刊物A类" value="中文核心刊物A类"></el-option>
						<el-option label="其他中文核心刊物" value="其他中文核心刊物"></el-option>
						<el-option label="国际学术会议(非双边)-特约报告" value="国际学术会议(非双边)-特约报告"></el-option>
						<el-option label="国际学术会议(非双边)-分组报告" value="国际学术会议(非双边)-分组报告"></el-option>
						<el-option label="国内或国际双边学术会议-特约报告" value="国内或国际双边学术会议-特约报告"></el-option>
						<el-option label="国内或国际双边学术会议-分组报告" value="国内或国际双边学术会议-分组报告"></el-option>
						<el-option label="补（中文核心A+期刊被SCI收录）" value="补（中文核心A+期刊被SCI收录）"></el-option>
						<el-option label="补（期刊EI被SCI收录）" value="补（期刊EI被SCI收录）"></el-option>
						<el-option label="补（会议EI被SCI收录）" value="补（会议EI被SCI收录）"></el-option>
						<el-option label="补（中文核心期刊A类被EI收录）" value="补（中文核心期刊A类被EI收录）"></el-option>
						<el-option label="JCR外的SCI-E" value="JCR外的SCI-E"></el-option>
						<el-option label="A类非核心，以及外文期刊非EI/SCI" value="A类非核心，以及外文期刊非EI/SCI"></el-option>
						<el-option label="中文核心A-" value="中文核心A-"></el-option>
						<el-option label="计算机学会推荐国际会议—特约报告A" value="计算机学会推荐国际会议—特约报告A"></el-option>
						<el-option label="计算机学会推荐国际会议—特约报告B" value="计算机学会推荐国际会议—特约报告B"></el-option>
						<el-option label="计算机学会推荐国际会议—特约报告C" value="计算机学会推荐国际会议—特约报告C"></el-option>
						<el-option label="计算机学会推荐国际会议—分组报告A" value="计算机学会推荐国际会议—分组报告A"></el-option>
						<el-option label="计算机学会推荐国际会议—分组报告B" value="计算机学会推荐国际会议—分组报告B"></el-option>
						<el-option label="计算机学会推荐国际会议—分组报告C" value="计算机学会推荐国际会议—分组报告C"></el-option>
						<el-option label="A+非中文核心" value="A+非中文核心"></el-option>
						<el-option label="教育教学研究论文" value="教育教学研究论文"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="检索号" prop="accession">
					<el-input v-model="editForm.accession" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="期卷号" prop="periodVolume">
					<el-input v-model="editForm.periodVolume" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="起始页码" prop="start">
					<el-input v-model="editForm.start" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="终止页码" prop="end">
					<el-input v-model="editForm.end" auto-complete="off"></el-input>
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
					periodical: '',
					rank: '',
					category: '',
					accession: '',
					periodVolume: '',
					start: '',
					end: '',
					time: ''
				},
				publish: '',

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
					periodical: '',
					rank: '',
					category: '',
					accession: '',
					periodVolume: '',
					start: '',
					end: '',
					time: ''
				},
				publish: '',

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